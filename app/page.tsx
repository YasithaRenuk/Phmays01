import logo from "@/public/logo.png";
import back from "@/public/back.jpg";

export default function Home() {
  return (
    <div data-theme="cupcake">
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/"> <img
            src={logo.src}
            alt="Logo"
            className="inline-block w-25 q h-12"
          /></a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/pages/auth/signin">Login</a>
            </li>
            <li>
              <a href="/pages/auth/register" >Register</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${back.src})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer footer-center bg-primary text-primary-content p-10">
        <aside>
        <img
            src={logo.src}
            alt="Logo"
            className="inline-block w-25 q h-12"
          />
          <p className="font-bold">
            Providing reliable tech since 2024
          </p>
          <p>Copyright © ${new Date().getFullYear()} - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
}
