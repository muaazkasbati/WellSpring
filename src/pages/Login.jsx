import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  console.log("email and password",email,password);
    const handleSubmit = async (e) => {
        // e.preventDefault();
    
        try {
            console.log();
          if (email === "admin@wellspring.health" && password === "admin@12345") {

            navigate("/home");
          } else {
            alert("Invalid credentials");
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      };

    const [isSecureEntry, setisSecureEntry] = useState(true)

    return (
        <>
            <section class="vh-100 wh-authentication">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card shadow-sm rounded border-0">
                                <div class="card-body p-5 text-center">

                                    <img onClick={() => navigate("/")} className="mx-auto d-block auth-logo mb-5 cursor-pointer w-auto" width="320" src={"../assets/images/logo.svg"} />
                                    <form >
                                        <div class="form-floating sp-input mt-3 mb-3">
                                            <input type="email" class="form-control" id="floatingInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" autocomplete="email" required />
                                            <label for="floatingInput">Email address</label>
                                        </div>
                                        <div class="form-floating sp-input mb-3 ">
                                            <input class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type={isSecureEntry ? "password" : "text"} autocomplete="password" required />
                                            <i onClick={() => { setisSecureEntry((prev) => !prev) }} className={`fa-solid ${isSecureEntry ? "fa-eye" : "fa-eye-slash"} eye-password`}></i>
                                            <label for="floatingPassword">Password</label>
                                        </div>
                                        <ul className="list-unstyled wh-lisks-list mb-0">
                                        <li className="active">
                                          <a className="cursor-pointer" onClick={()=>handleSubmit()}>Login <i class="bi bi-arrow-right"></i></a>
                                        </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Login;
