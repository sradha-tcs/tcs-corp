// add delayed functionality here

// the data layer -> Web SDK bridge (utils/web-sdk.js, KB-D-074): only on pages that turn it on
// (metadata web-sdk = on); its module isn't loaded otherwise
if (/^(on|yes|true)$/i.test(document.head.querySelector('meta[name="web-sdk"]')?.content?.trim() || '')) {
  import('../utils/web-sdk.js').then(({ startWebSdkBridge }) => startWebSdkBridge()).catch(() => {});
}
