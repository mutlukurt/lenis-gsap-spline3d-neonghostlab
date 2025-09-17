import React from 'react'
import { Github, Twitter, Mail, ArrowUp } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'

export default function Footer() {
  const { scrollTo } = useLenis()

  const handleBackToTop = () => {
    scrollTo(0, { duration: 0.8 })
  }

  return (
    <footer className="relative bg-[var(--card)] border-t border-[var(--surface)]">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gradient">NeonGhost Lab</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              AI-native motion, scrollcraft, and playful micro-interactions for websites that feel alive.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[var(--text)]">Services</h4>
            <ul className="space-y-2 text-[var(--muted)]">
              <li>3D Hero Integrations</li>
              <li>Scroll-Bound Storytelling</li>
              <li>Micro-Interactions</li>
              <li>Performance Optimization</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[var(--text)]">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors rounded-lg hover:bg-[var(--surface)]"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors rounded-lg hover:bg-[var(--surface)]"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@neonghost.lab"
                className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors rounded-lg hover:bg-[var(--surface)]"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--surface)] flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-[var(--muted)] text-sm">
            © 2025 Mutlu Kurt. Licensed under MIT License.
          </p>
          
          <button
            onClick={handleBackToTop}
            className="flex items-center space-x-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors group"
            aria-label="Back to top"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}