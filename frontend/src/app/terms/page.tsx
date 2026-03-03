import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="pt-10 mb-6 text-4xl font-bold">Terms &amp; Conditions</h1>
        <p className="mb-4 text-[#8B95B0]">
          By using Baksy, you agree to the following terms and conditions. Please read them
          carefully.
        </p>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Use of Service</h2>
        <ul className="list-disc ml-6 mb-4 text-[#8B95B0]">
          <li>Baksy is provided as-is, without warranty of any kind.</li>
          <li>You are responsible for compliance with all applicable laws.</li>
        </ul>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Intellectual Property</h2>
        <ul className="list-disc ml-6 mb-4 text-[#8B95B0]">
          <li>
            All code and content provided by Baksy is the intellectual property of its creators.
          </li>
          <li>You may not redistribute or resell the product without permission.</li>
        </ul>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Limitation of Liability</h2>
        <p className="mb-4 text-[#8B95B0]">
          Baksy is not liable for any damages or losses resulting from use of the product.
        </p>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Contact</h2>
        <p className="mb-4 text-[#8B95B0]">
          For questions about these terms, contact us at{' '}
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
