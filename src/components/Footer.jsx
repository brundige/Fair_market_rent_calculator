import './Footer.styles.module.css'

function Footer() {
    const supportEmail = "cmbrundige@chattanooga.gov"
  return (
    <footer className="footer">
      <div className="container">
          <span className="text-muted"><a href="mailto:{supportEmail}" > IT support</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;