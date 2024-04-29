FROM openjdk:17-jdk-alpine AS builder
WORKDIR /app
COPY ./ ./
RUN ./gradlew bootJar -DskipTests

FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/backend-1.0.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]