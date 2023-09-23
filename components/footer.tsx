export default function Footer() {
    const companyName = "SolveSimply Ltd"
  return (
    <footer className="fixed flex justify-center items-center bottom-0 inset-x-0 z-100 text-darkGrey text-center text-sm md:text-md py-1 md:py-6">
      <span className="">
        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
      </span>
    </footer>
  );
}
