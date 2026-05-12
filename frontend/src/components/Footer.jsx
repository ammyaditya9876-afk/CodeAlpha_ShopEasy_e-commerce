const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-muted)' }}>
      <div className="container">
        <p>ShopEasy by ADITYA &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
