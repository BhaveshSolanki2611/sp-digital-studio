// Script to set up Supabase database tables
// Run with: node scripts/setup-database.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://kqdogstazxjrmweyanrf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZG9nc3Rhenhqcm13ZXlhbnJmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTg5MDEzMSwiZXhwIjoyMDg1NDY2MTMxfQ.35ulH_08RU4aoal-xIv5q4fTCbkDHlHMb2m1u_D-XIg';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('Setting up Supabase database...\n');
  
  // Read the SQL file
  const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');
  
  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`Found ${statements.length} SQL statements to execute.\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    const preview = statement.substring(0, 60).replace(/\n/g, ' ') + '...';
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        // Try using the REST API directly
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({ sql: statement + ';' }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
      }
      
      console.log(`✓ [${i + 1}/${statements.length}] ${preview}`);
      successCount++;
    } catch (err) {
      console.log(`✗ [${i + 1}/${statements.length}] ${preview}`);
      console.log(`  Error: ${err.message}\n`);
      errorCount++;
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Setup complete: ${successCount} succeeded, ${errorCount} failed`);
  console.log(`========================================\n`);
  
  console.log('Please run the SQL manually in Supabase Dashboard:');
  console.log('https://supabase.com/dashboard/project/kqdogstazxjrmweyanrf/sql\n');
}

setupDatabase().catch(console.error);
