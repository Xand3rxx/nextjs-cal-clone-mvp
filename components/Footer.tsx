const Footer = () => {
  return (
    <footer className="text-center text-white backgroundSlateCustom lg:text-left">
      <div className="p-6 text-center backgroundSlateCustom">
        <span>© {new Date().getFullYear()} </span>
        <a className="font-semibold text-white" href="#">
          Cal.com(Clone).
        </a>{" "}
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
