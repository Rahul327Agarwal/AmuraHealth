export const REACT_APP_HASH_KEY = `JuFpt6Vmj@6%tuG3jJ9$h!xE8t9Z8=My#Yc6qKzy?$CCB$$8ZhkL%+B=MZW!qPBvD$h=%ZdPn3?VB4xu&j!m!hEYbP+HNCmW=^yUAEdt*n+ayh?Yk5_uxVKFG8WkhFCGkdKDBVRyqU+3a_Vp3HSjDYMTAy&SL@yzEG2bM!c?998p44RN@2Cb35j#SRBMYuf$Rug$jJz_-cN+a*^8?ry=7nK2xgucJG3*^JJ+9-PT2TB9p8-C9?5VrTUPMPyLW-yK4aD&gseSw988cL&g^3rVj$2t2FGaZ@Y4xzk*kJpkNs2xxd%e%H7MyHV@$2#tFyfJRrk^yasE%FXB#*M##HrM?YQ+BFE_xx8W8D-MS+Thx&tEtvw=u6Q-bzu3xWnmGJ%-a^V@Zs_Tv-t9gcVjLT7wpvT9u*rUG&-WB3P9vXTSLzPsf8tpUb96?CCS_f_wz2_FUYsfNQUFNG8FJR@F+SkQjfU_rfc5ZxG&UmFm4&b@P87Fus35ZX3%d@3bWp*mN7#K=!5C*R9BVD=JNn=neu+A&LtbYVpa2Wyd+U_LhPYNCQ5mV4vNt9P$Kd+ugJ77hXVPx^+H6gDeSvf=qU_-%HJGxARNPHHvZ%r8H58yHL&b&64HB@f?Dh5Ndh$N?T=2-rgES6P8D?uNGc9$*gHG-$PpmR4a=^3v9U9G^G^RuRp7F@MFKY*CbTF%^hEV^+kS7&Wzp@Ja7n2Kt7rpx-vMFywaauKXnPBJWCxDfhGav=v-#37cng=npt76DnqdtBWgWTcgZKQCX5%8x^FEFJzvPbD%u44w!va^Y68tKFtf-CrFr^nmHQ@NUxderNkkpB5q=vRGh4!ukqkc&jwuUK6gM+RTkb7nt!W^c$8e7K%$!&&nuE&fHV$L#9Gmy$%bE2E^qNrwvkLwRtd3eFy=ZM+ew^9Zv9ghFDK*9!B8B%Ueub%7Y%wzSpH=^T^h$sRq*fXf#CnnB?PxRd=*Gq2ptAwtBJN#WA=!U3YNrZM#Cr8Zxhmnux9tz*RDhJC9rwt@uEg#BMv^aErD=dsaFH3cFr9_*%whxG9z3Dc5Vu_m^Zq&Sxht+!6VcrR*KT%Nef#6LU-w#q7zQCzwH4x@Hf!yCfys^9S2$ChN_ZGNw9yHTB^rp%JJT3xF58vSJ9m&6HEJPpw2svE7fC8WSQQrYa+m#@75DM_*@pCTrtfHG^gbc*a#e4T_Ee=L2$W-xpx3%sYM?#v?fPhR#+t*MFJh6uNaLY?XxHWY&5D^x*g!CL9d5!WtFaMLTLjA42f3sUW56sg4^+Lm*@qm8-d%kx%tm*#MRE#wy_b*#27@B8N&8Y3!BK2!h^d4r!McJHtBejkr*4zwQHXw*!PvJD#2HjtnzyWyM4!fW&HdeQB+X7cXU7qA^xN*ye%b+WVeX4TnbsqkC2VS2Gq4?4T&yv!F3-HV58JCMrfR82JCGCFBYF_^U*HHJQsBBsasDdS+&9ZK@@%W6F?$#_tssB@+C$q7W-H4_^6hHJp9sCPChrDuLcbdq-cLYwrGpVm45KqAB=w?kTBxXh5NDx2k?RCg97TU4-vLMpDa-#w!$PAZPTXVb%jM@TxNZ4*udGXH56_gcZTD*s$n?K8Vm_#59LQU3@t-LSvV^3qsTjJpkBrg+ChrVG&E-#zwthBT!#wKSt=59^jPJWw^L%RmB*gc5PG=ss4V87QBktb!-gFE!-Jp8CADLsNcS5QJ?x%QW3CD&hYa#F?A++!c!DKy_LAyKTuf_F$#Rv5*R8@BZ+TPkEmRzSQJrNj_t!jWb96-K6Mau6@nq!4*btNfDg4B2PY$Yac+fy&WfWTkyn=A!HpPByS%-hbQkU+GD-zXwtX4C2jdn3NE28StN&GL_q_e+uns$UV+k4nypr=us!Tm_PC9PKysKY!=3DQQZMcR3*r!K-Aex+Vby22%*J7jJs3zSy$jXWf3B&U!k2%5K48m?&p6?WJq6aqdF#*N5aJF5pK=dp@B+?pz!Q68!aAfj4e@#gz%SNBP4xByGwN+99tebYJzL9W_vFKJ+zxW8wD5?zj2FBd+A=Qg5!ZhCxPSV8yA3aN8L+qz`;

import * as CryptoJS from "crypto-js";

export const decryptData = async (ciphertext: string) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, REACT_APP_HASH_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const decryptDataWithKeyProvided = async (
  ciphertext: string,
  hashKey: string
) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, hashKey);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
