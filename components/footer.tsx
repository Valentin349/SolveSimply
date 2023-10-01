"use client"
export default function Footer() {
    const companyName = "SolveSimply Ltd"
  return (
    <footer className="fixed flex justify-center items-center bottom-0 inset-x-0 z-100 text-beige text-center text-sm md:text-md py-1 md:py-6">
      <span className="">
        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
      </span>
      <span className="ml-4">
        <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </span>
    </footer>
  );
}

