import React, { useEffect, useState } from "react";

import "https://connect.facebook.net/en_US/sdk.js";
// http://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
const FacebookLogin = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  //
  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     FB.init({
  //       appId: "1037157457985120",
  //       cookie: true,
  //       xfbml: true,
  //       version: "v10.0",
  //     });
  //
  //     FB.AppEvents.logPageView();
  //     setSdkLoaded(true);
  //   };
  //
  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");
  // }, []);
  //
  // const statusChangeCallback = (response) => {
  //   console.log("statusChangeCallback");
  //   console.log(response);
  //   document.getElementById("status").innerHTML =
  //     "Thanks for logging in, " + response.status + "!";
  //   if (response.status === "connected") {
  //     testAPI();
  //   } else {
  //     document.getElementById("status").innerHTML = "Please log into this app.";
  //   }
  // };
  //
  // const checkLoginState = () => {
  //   FB.getLoginStatus(function (response) {
  //     statusChangeCallback(response);
  //   });
  // };
  //
  // const testAPI = () => {
  //   console.log("Welcome! Fetching your information.... ");
  //   FB.api("/me", function (response) {
  //     console.log("Successful login for: " + response.name);
  //     document.getElementById("status").innerHTML =
  //       "Thanks for logging in, " + response.name + "!";
  //   });
  // };
  //
  // if (!sdkLoaded) {
  //   return <div>Loading...</div>; // Możesz tu umieścić spinner lub inną animację ładowania
  // }

  return (
    <div>
      {/*<div id="status"></div>*/}
      {/*<button onClick={checkLoginState}>Login with Facebook</button>*/}
    </div>
  );
};

export default FacebookLogin;
