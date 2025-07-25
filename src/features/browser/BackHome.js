import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

function BackToHomeOnBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    const unlisten = window.addEventListener("popstate", () => {
      navigate("/", { replace: true });
    });

    previousLocation.current = location;

    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, [navigate]);

  return null;
}


export default BackToHomeOnBackButton;