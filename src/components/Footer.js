import bg from '../asset/footer-bg.jpg';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-img" style={{ backgroundImage: `url(${bg})` }}>
          <div className="inner-footer">
            <div className="footer-text">
              <h5>Curs Desenvolupament a Java amb Framework Spring</h5>
            </div>
            <div className="contact">
              <ul className="icons">
                <h4>Contact</h4>
                {/* <li>https://www.linkedin.com/in/gisnetz/</li>          */}
              </ul>
            </div>
          </div>
          <p className="copyright">
            &copy;2022  React Film App by GARA
          </p>
        </div>
      </footer>
    </>

  )
}

export default Footer