const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} My Online Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;