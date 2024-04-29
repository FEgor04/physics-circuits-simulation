FROM openjdk:17-jdk-slim AS builder
COPY ./ ./
RUN ./gradlew bootJar -DskipTests
FROM openjdk:17-jdk-slim
COPY --from=builder build/libs/backend-1.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
