import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="pt-10 mb-6 text-4xl font-bold">Privacy Policy</h1>
        <p className="mb-4 text-[#8B95B0]">
          Your privacy is important to us. This policy explains how we handle your data and protect
          your information when you use Baksy.
        </p>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4 text-[#8B95B0]">
          <li>We only collect information necessary to provide our services.</li>
          <li>No sensitive personal data is stored without your consent.</li>
        </ul>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">How We Use Information</h2>
        <ul className="list-disc ml-6 mb-4 text-[#8B95B0]">
          <li>To improve our product and user experience.</li>
          <li>To communicate important updates or changes.</li>
        </ul>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Data Security</h2>
        <p className="mb-4 text-[#8B95B0]">
          We use industry-standard security measures to protect your data from unauthorized access.
        </p>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Contact</h2>
        <p className="mb-4 text-[#8B95B0]">
          If you have questions about this policy, contact us at{' '}
          <a href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`} className="text-[#5B8CFF] underline">
            {process.env.NEXT_PUBLIC_MAIL}
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
