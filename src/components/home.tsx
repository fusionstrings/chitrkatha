import React from "https://esm.sh/react";

function Logo() {
  return (
    <h1 className="logo-chitrkatha">
      <a href=".">
        <img
          width="300"
          src="/images/chitrkatha-minimal-logo.svg"
          alt="Chitrkatha"
        />
      </a>
    </h1>
  );
}

function Header() {
  return (
    <header>
      <Logo />
    </header>
  );
}

function Main() {
  return (
    <main data-layout="hero">
      <h2>Home of accessible Comics, Stories and Art.</h2>
      <nav>
        <ul>
          <li>
            Read now <a href="/xkcd">XKCD</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}

function Footer() {
  return (
    <div className="chitrkatha-footer">
      <footer>
        <p>&copy 2021 Chitrkatha</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="chitrkatha-page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
