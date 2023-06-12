JWT全称JSON Web Token，由三部分组成: header(头)、payload(载体)、signature(签名)。

- header：JWT第一部分是header,header主要包含两个部分,alg指加密类型，可选值为HS256、RSA等等，typ=JWT为固定值，表示token的类型。
- Payload：JWT第二部分是payload,payload是token的详细内容,一般包括iss (发行者), exp (过期时间), sub(用户信息), aud (接收者),以及其他信息，详细介绍请参考官网,也可以包含自定义字段。
- signature：JWT第二部分是signature,这部分的内容是这样计算得来的:
  ```js
  1、EncodeString = Base64(header).Base64(payload)
  2、最终token = HS256(EncodeString,"秘钥")
  ```