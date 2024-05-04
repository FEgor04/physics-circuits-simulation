FROM gradle:8.2.0-jdk17-alpine AS builder
WORKDIR /home/gradle
COPY ./ ./
RUN ./gradlew bootJar -DskipTests

FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=builder  /home/gradle/build/libs/backend-1.0.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]