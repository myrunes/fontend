<div align="center">
  <img src="https://raw.githubusercontent.com/myrunes/assets/master/logo/rendered/dark/logo-1000-237-colored-dark.png" width="400"/>
  <br/>
  <strong>Save your League of Legends rune pages without wasting money.</strong><br><br>
  <img src="https://forthebadge.com/images/badges/made-with-vue.svg" height="30" />&nbsp;
  <a href="https://stackshare.io/myrunes/myrunes"><img src="https://img.shields.io/badge/tech-stack-blue?style=for-the-badge" height="30"/></a>&nbsp;
  <a href="https://zekro.de/discord"><img src="https://img.shields.io/discord/307084334198816769.svg?logo=discord&style=for-the-badge" height="30"></a>
  <br/><br/>
  <a href="https://hub.docker.com/r/myrunes/frontend"><img src="https://img.shields.io/docker/cloud/automated/zekro/myrunes.svg?color=cyan&logo=docker&logoColor=cyan&style=for-the-badge" height="30"></a>&nbsp;
  <a href="https://github.com/myrunes/frontend/actions"><img src="https://img.shields.io/github/workflow/status/myrunes/frontend/Main%20CI?label=Actions&logo=github&style=for-the-badge" height="30"/></a>&nbsp;
</div>

---

# Frontend

This is the repository of the front end of [myrunes.com](https://myrunes.com), built with Vue. The compiled static front end files are then served by NGINX as web server inside a Docker container.

---

# What is MYRUNES?

MYRUNES is a little web tool where you can simply create and store League of Legends rune pages without spending ingame (or even real) money for rune pages. Just visit [myrunes.com](https://myrunes.com), create an account and save your runes to be ready for the next pick and ban.  
Of course, if you don't trust us, you can download the source code and build the binaries and front end to be hosted on your own server environment.

---

# Docker

The font end image can be pulled from the official docker registry:
```
# docker pull myrunes/frontend
```

[**Here**](https://github.com/myrunes/docker-compose-stack) you can find a configuration example to set up myruens with docker-compose in a stack with the front end, back end *(providing REST API)*, MongoDB and portainer as Docker web control panel.

If you want to build the image yourself, use the provided `Dockerfile` in this repository:
```
# docker build . -t myrunes/frontend
```

If you want to provide the REST API on another (sub)domain, just pass the domain of the REST API as build argument:
```
# docker build . -t myrunes/frontend \
    --build-arg VUE_APP_API_HOST_URL=https://api.myrunes.com
```

---

© 2019-20 Ringo Hoffmann (zekro Development)  
Covered by the MIT Licence.