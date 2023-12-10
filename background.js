
browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

function handleProxyRequest(requestInfo) {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/proxy/RequestDetails
  const { url } = requestInfo;

  const parsedUrl = new URL(url);

  if (parsedUrl.host.endsWith(".foo.localhost")) {
    return {
      type: "socks",
      // host: "127.0.0.1",
      host: "file:///run/user/1000/soxidizer.socks",
      port: 9999,
      proxyDNS: true,
    };
  }

  return {
    type: "direct"
  }
}


// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});
