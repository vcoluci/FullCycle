The files are the solution of Desafio from FullCycle 3.0 related to Module: Devops.

The description of challenge is: 

Você terá que publicar uma imagem no docker hub. Quando executarmos:
docker run <seu-user>/fullcycle
Temos que ter o seguinte resultado: Full Cycle Rocks!!
Se você perceber, essa imagem apenas realiza um print da mensagem como resultado final, logo, vale a pena dar uma conferida no próprio site da Go Lang para aprender como fazer um "olá mundo".
Lembrando que a Go Lang possui imagens oficiais prontas, vale a pena consultar o Docker Hub.
3) A imagem de nosso projeto Go precisa ter menos de 2MB =)

As part of the solution, we see in the Dockerfile.prod the utilization of Multi staging techinique in a way to the image has less 2MB as we can see.

REPOSITORY              TAG       IMAGE ID       CREATED       SIZE
vcolucidocker/desafio   prod      45297096fffd   8 hours ago   1.85MB

This is the link of image on DockerHub:

https://hub.docker.com/repository/docker/vcolucidocker/desafio/general
