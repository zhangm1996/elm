const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/restapi', { 
      target: 'https://h5.ele.me',
      changeOrigin:true,
      headers:{
        'x-shard': 'loc=121.614761,38.913689',
                'x-uab': '117#9SEv1g9l91aDlcC+dOKyncycTEIjjbqELUjgBnFoEtuBZNFOmcjWE2dbOIdcBzjumpvD0E8RASapZIdFBEVDAbgURBNRBkx6TvzhhYfRABJGmtdF8E8uAbgpOIFCBkcuZQv9Od8RASapZId9B+FuChxF0PxCBkGxx1qICNokoya6Kg14TKTiALICBdV2YAehICVRRNIbQPtnc4MflRm38v1uVSVgADux85IyocQyi0tnIY8eTMvhCnuEBoskP3PiILZRoxSy0XtCI+FpNM4h0Cm+BEL++ihhILrEocQy0XD+VYfpTMEhiCmCBkZ26WPiILZRoxSyi0PoUEMP9Tq3nttU1OkDDYjtFDsBIh+G82n2BcxDMyW7C5IxobTG4waO+FVDfFxj1iTsqiultqHFQzOkofwxM3m6MMjBo6EAAzTVBPS1+Kty6Zvsv82aeqp28v51NjMct6Q0D8J5gMNiw7Pv4+TNrD9/exKx58rcCVB+jPWcfhAEJ8ITWTzSZ/HdCXrXlo1DHLWKdou0Ne4wdBgpZBUldTMI3wZjFb7ze1Y7bVSlZHHh3kEu9HUDZUOu1cpzWWp5HVT=',
        'cookie':'ubt_ssid=s2s8vlfyj3k0cw1jf3oi1pp8avs0d0zq_2019-02-13; _utrace=0cf43d750a9e282a92e037410c2e6ca4_2019-02-13; perf_ssid=b3aep7arkme9mnxi3cu6ytvih9z4jryp_2019-02-13; cna=yOG6FL9xU1ICAd9mV6T1KsYd; _bl_uid=azj5svd5edCuLFu4jlF48d6601L0; track_id=1558501857|1d9ee8c3910a7399108f4457a8b4ba73cec9e9bebb63ded006|f2feb9d31b23ba7212c47be2fa552610; UTUSER=568227458; FAAS_GRAY_ID=99; ut_ubt_ssid=zkadlue02w2j9mihx2nhcj604jdsvspi_2019-05-22; USERID=568227458; SID=H4OW5k2N4RbxE1um0U5HIan1kT1B20pdVTVQ; ZDS=1.0|1558514543|5ICec3Fb8xle/SErx2n6RG+VK8H0lhA+e1NSpESWmCa6R6+iM6ufQZOgiPRLIlSHEDPNkmy5pX1kmWqLJvUDUg==; isg=BEtLnHD9k_TLJs-lcYs45iiq2u8_4sOPbgsVHr1IJgrh3Go-RbC6t_pqsJqXfLda'
        } 
  }));
  app.use(proxy('/pizza', { 
    target: 'https://h5.ele.me',
    changeOrigin:true

}));

};