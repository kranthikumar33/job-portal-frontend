import { useNavigate } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-base font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>
  </div>
);

const Terms = () => {
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
            <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-sm text-gray-400 mt-2">Last updated: January 2025</p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using JobPortal, you agree to be bound by these Terms and
              Conditions. If you do not agree with any part of these terms, you may not use
              the platform.
            </p>
          </Section>

          <Section title="2. User Accounts">
            <p>
              You must provide accurate and complete information when creating an account.
              You are responsible for maintaining the security of your account credentials
              and for all activity that occurs under your account.
            </p>
            <p>
              JobPortal reserves the right to suspend or terminate accounts that violate
              these terms or engage in fraudulent activity.
            </p>
          </Section>

          <Section title="3. Student Responsibilities">
            <p>As a student user, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
              <li>Provide truthful information in your profile and applications</li>
              <li>Apply only to jobs you genuinely intend to pursue</li>
              <li>Not misrepresent your qualifications or experience</li>
              <li>Treat recruiters with professionalism</li>
            </ul>
          </Section>

          <Section title="4. Recruiter Responsibilities">
            <p>As a recruiter, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
              <li>Post only legitimate, real job opportunities</li>
              <li>Not discriminate based on gender, religion, caste, or disability</li>
              <li>Handle applicant data with confidentiality</li>
              <li>Update or remove job listings that are no longer active</li>
              <li>Respond to applications in a reasonable timeframe</li>
            </ul>
          </Section>

          <Section title="5. Prohibited Conduct">
            <p>All users are prohibited from:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
              <li>Creating fake accounts or impersonating others</li>
              <li>Posting spam, misleading, or fraudulent job listings</li>
              <li>Scraping or extracting data from the platform</li>
              <li>Attempting to compromise platform security</li>
              <li>Using the platform for any unlawful purpose</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on JobPortal — including the logo, design, and code — is the
              property of JobPortal. Users retain ownership of content they submit (resumes,
              job descriptions) but grant JobPortal a limited license to display that content
              on the platform.
            </p>
          </Section>

          <Section title="7. Disclaimers">
            <p>
              JobPortal is a platform that connects job seekers and employers. We do not
              guarantee employment, the accuracy of job listings, or the suitability of any
              applicant. We are not responsible for the outcome of any hiring process.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              JobPortal shall not be liable for any indirect, incidental, or consequential
              damages arising from your use of the platform, including but not limited to
              loss of employment opportunity or data loss.
            </p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the
              platform after changes are posted constitutes your acceptance of the revised
              terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For questions about these Terms, contact us at{" "}
              <span className="text-blue-600">support@jobportal.dev</span>.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
