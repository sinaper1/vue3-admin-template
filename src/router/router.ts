import {homeRoute} from "@/router/home";
import {loginRoute} from "@/router/login";
import {screenRoute} from "@/router/screen";
import {aclRoute} from "@/router/acl";
import {productRoute} from "@/router/product";

export const constantRoute = [
    ...loginRoute,
    ...homeRoute,
    ...screenRoute,
    ...aclRoute,
    ...productRoute,
];
