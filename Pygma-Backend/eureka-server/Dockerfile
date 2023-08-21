FROM openjdk:17-jdk-slim
RUN mkdir /app
WORKDIR /app
COPY target/eureka-server-0.0.1-SNAPSHOT.jar /app
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/eureka-server-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=docker"]
EXPOSE 8761