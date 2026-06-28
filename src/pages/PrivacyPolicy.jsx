import { useNavigate } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-base font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-gray-700 mb-6 flex items-center gap-1.5 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mt-2">Last updated: January 2025</p>
          </div>

          <Section title="1. Information We Collect">
            <p>
              When you register on JobPortal, we collect personal information such as your full
              name, email address, phone number, and role (student or recruiter). Recruiters
              additionally provide company details when registering a company.
            </p>
            <p>
              We also collect usage data such as jobs viewed, applications submitted, and
              interaction patterns to improve the platform experience.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
              <li>Operate and maintain the JobPortal platform</li>
              <li>Match students with relevant job opportunities</li>
              <li>Allow recruiters to review applications</li>
              <li>Send account-related notifications</li>
              <li>Improve platform performance and user experience</li>
            </ul>
          </Section>

          <Section title="3. Information Sharing">
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              When a student applies to a job, their name, email, and phone number become
              visible to the recruiter who posted the job. This is essential to the platform's
              core function.
            </p>
          </Section>

          <Section title="4. Data Security">
            <p>
              Passwords are hashed using industry-standard bcrypt encryption and are never
              stored in plain text. Authentication is handled via secure HTTP-only cookies.
              We take reasonable precautions to protect your data, though no system is
              completely secure.
            </p>
          </Section>

          <Section title="5. Cookies">
            <p>
              JobPortal uses cookies solely for authentication — to keep you logged in across
              sessions. We do not use advertising cookies or third-party tracking cookies.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{" "}
              <span className="text-blue-600">support@jobportal.dev</span>.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify users of
              significant changes by updating the date at the top of this page. Continued use
              of the platform after changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              If you have questions about this Privacy Policy, reach us at{" "}
              <span className="text-blue-600">support@jobportal.dev</span>.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
