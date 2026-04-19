import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const features = [
    {
      icon: '📘',
      title: 'Daily Recitation Logs',
      text: 'Capture each session with surah, ayah range, grade, and teacher notes in one clean flow.',
    },
    {
      icon: '📊',
      title: 'Weekly Progress Insights',
      text: 'Generate summaries that show consistency, growth trends, and areas to improve.',
    },
    {
      icon: '🔐',
      title: 'Role-Safe Access',
      text: 'Separate spaces for admins, teachers, parents, and students with protected routes.',
    },
    {
      icon: '🤝',
      title: 'Parent Visibility',
      text: 'Parents can monitor recitation outcomes and stay informed without chasing updates.',
    },
  ];

  const roleCards = [
    {
      route: '/admin',
      icon: '👨‍💼',
      label: 'Administrator',
      text: 'Manage users, approvals, and school-wide reporting.',
    },
    {
      route: '/staff',
      icon: '👨‍🏫',
      label: 'Teacher / Staff',
      text: 'Record sessions, grade students, and submit summaries.',
    },
    {
      route: '/parent',
      icon: '👨‍👩‍👧',
      label: 'Parent / Guardian',
      text: 'Track your child’s memorization and engagement.',
    },
    {
      route: '/student',
      icon: '👨‍🎓',
      label: 'Student',
      text: 'Review your performance and recitation history.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen mesh-bg fade-rise">
        <section className="pt-8 pb-16 sm:pt-12 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-stretch">
              <div className="glass-panel rounded-[2rem] p-7 sm:p-10 lg:p-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,122,99,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(199,159,63,0.18),transparent_28%)] pointer-events-none" />
                <div className="relative max-w-3xl">
                  <p className="uppercase tracking-[0.28em] text-xs text-[color:var(--mint-600)] mb-4 font-bold">Qur'anic Learning Platform</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--ink-900)] leading-[0.98] max-w-2xl">
                    Modern school management for memorization, progress, and family trust.
                  </h1>
                  <p className="mt-5 text-base sm:text-lg text-[color:var(--ink-700)] max-w-2xl">
                    Built for Islamic schools that want clear tracking, reliable reporting, and smoother communication between teachers, students, and families.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/login" className="brand-btn">Enter Platform</Link>
                    <Link to="/login" className="brand-btn-secondary">Choose Your Role</Link>
                  </div>

                  <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="rounded-2xl bg-white/80 border border-white p-4 shadow-sm">
                      <p className="text-2xl font-extrabold text-[color:var(--ink-900)]">100%</p>
                      <p className="text-sm text-[color:var(--ink-500)]">Digital records</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 border border-white p-4 shadow-sm">
                      <p className="text-2xl font-extrabold text-[color:var(--ink-900)]">4</p>
                      <p className="text-sm text-[color:var(--ink-500)]">Role dashboards</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 border border-white p-4 shadow-sm">
                      <p className="text-2xl font-extrabold text-[color:var(--ink-900)]">24/7</p>
                      <p className="text-sm text-[color:var(--ink-500)]">Progress access</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 border border-white p-4 shadow-sm">
                      <p className="text-2xl font-extrabold text-[color:var(--ink-900)]">Secure</p>
                      <p className="text-sm text-[color:var(--ink-500)]">Role-based system</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-[auto_auto] gap-6">
                <div className="rounded-[2rem] bg-[#102733] text-[#f5ecd9] p-7 sm:p-8 shadow-[0_24px_60px_rgba(16,39,51,0.28)] relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-3xl" />
                  <p className="text-xs uppercase tracking-[0.24em] text-[#d7ccb4] font-bold mb-4">Operational snapshot</p>
                  <div className="space-y-4 relative">
                    <div className="flex items-center justify-between rounded-2xl bg-white/8 border border-white/10 px-4 py-3">
                      <div>
                        <p className="text-sm text-[#d9d0c0]">Today&apos;s recitations</p>
                        <p className="text-2xl font-bold">128</p>
                      </div>
                      <span className="text-sm font-semibold text-[#8de0c8]">+12%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/8 border border-white/10 px-4 py-3">
                      <div>
                        <p className="text-sm text-[#d9d0c0]">Weekly summaries</p>
                        <p className="text-2xl font-bold">34</p>
                      </div>
                      <span className="text-sm font-semibold text-[#f0d38c]">Ready</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/8 border border-white/10 px-4 py-3">
                      <div>
                        <p className="text-sm text-[#d9d0c0]">Parent updates</p>
                        <p className="text-2xl font-bold">Instant</p>
                      </div>
                      <span className="text-sm font-semibold text-[#8de0c8]">On</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-[#f8eed8] border border-[#e5d7b6] p-7 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--ink-500)] font-bold mb-4">Fast access</p>
                  <div className="grid grid-cols-2 gap-3">
                    {roleCards.map((role) => (
                      <Link key={role.route} to={role.route} className="rounded-2xl bg-white border border-[#e8dfcd] p-4 card-lift">
                        <p className="text-2xl mb-2">{role.icon}</p>
                        <p className="font-bold text-[color:var(--ink-900)] text-sm">{role.label}</p>
                        <p className="text-xs text-[color:var(--ink-500)] mt-1">Open role path</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 max-w-2xl">
              <p className="uppercase tracking-[0.22em] text-xs text-[color:var(--mint-600)] font-bold mb-3">Why it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--ink-900)]">A focused toolset for schools that want clarity.</h2>
              <p className="text-[color:var(--ink-500)] mt-3">Purpose-built workflows for memorization-focused schools, with less manual follow-up and cleaner reporting.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature, index) => (
                <article key={feature.title} className="glass-panel card-lift rounded-3xl p-6" style={{ animationDelay: `${index * 90}ms` }}>
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[color:var(--ink-900)] mb-2">{feature.title}</h3>
                  <p className="text-[color:var(--ink-500)] text-sm leading-relaxed">{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] bg-[#102733] text-[#f2ead8] p-8 sm:p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#1f7a63]/20 blur-3xl" />
              <div className="relative max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to begin?</h2>
                <p className="text-[#d8ccb6] mb-6 max-w-2xl">
                  Sign in and start managing recitation records, weekly summaries, and student growth in one place.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/login" className="brand-btn">Go To Login</Link>
                  <Link to="/login" className="inline-flex items-center justify-center rounded-xl font-bold px-6 py-3 bg-white/10 text-white border border-white/15 hover:bg-white/15 transition">Browse roles</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[color:var(--line-soft)] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[color:var(--ink-500)]">
            <p>© 2026 Islamiyya School Management System</p>
            <p className="mt-1 text-sm">support@islamiyyaschool.edu</p>
            <Link
              to="/login"
              className="inline-flex mt-4 text-sm font-bold text-[color:var(--mint-600)] hover:text-[color:var(--mint-500)]"
            >
              Open login roles
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
