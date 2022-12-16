final: prev:

let

  isAarch64 = prev.stdenv.hostPlatform.isAarch64;
  isDarwin  = prev.stdenv.isDarwin;

in prev.lib.optionalAttrs (isAarch64 && !isDarwin) {
  libsigsegv = prev.libsigsegv.overrideAttrs (attrs: {
    preConfigure = (prev.preConfigure or "") + ''
      sed -i 's/^CFG_FAULT=$/CFG_FAULT=fault-linux-arm.h/' configure
    '';
  });
}
