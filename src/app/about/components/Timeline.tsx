'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    year: '1996',
    title: 'The Beginning',
    description: 'Satpal Solanki opens SP Digital Studio in Najafgarh, starting with passport photos and family portraits.',
  },
  {
    year: '2002',
    title: 'Wedding Photography',
    description: 'Expanded into wedding photography, quickly becoming known for capturing beautiful ceremonies.',
  },
  {
    year: '2008',
    title: 'Digital Transition',
    description: 'Fully transitioned to digital photography and introduced professional video services.',
  },
  {
    year: '2012',
    title: 'Color Lab Launch',
    description: 'Added in-house color lab for instant prints, albums, and custom merchandise.',
  },
  {
    year: '2018',
    title: 'Drone & 360 Services',
    description: 'Introduced drone coverage and 360 selfie booth for events, staying ahead of trends.',
  },
  {
    year: '2024',
    title: 'Digital Innovation',
    description: 'Launched online booking, digital proofs, and expanded equipment rental services.',
  },
]

export function Timeline() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Milestones Through the Years
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            From a small photo studio to a full-service photography and video production house,
            here&apos;s how we&apos;ve grown over the decades.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-px" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year Badge */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-accent flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}>
                  <div className="bg-white rounded-xl shadow-md p-6 hover-lift">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
