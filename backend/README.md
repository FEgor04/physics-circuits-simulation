## Сборка

Для сборки приложения необходимо выполнить следующие действия.

1. Склонировать репозиторий:

   ```
   git clone https://github.com/FEgor04/physics-circuits-simulation
   cd physics-circuits-simulation
   ```
2. Выполнить сборку проекта:

   ```
   ./gradlew bootJar
   ```
- В случае возникновения ошибки "./gradlew: команда не найдена", выполните следующую команду:

    ```
   gradle wrapper --gradle-version 8.7 
   ```
  **Повторите** команду "./gradlew bootJar" из пункта 2.

3. Выполнить build в директории приложения с помощью следующей команды:

   ```
   docker compose build 
   ```

4. Для запуска приложения необходимо выполнить следующую команду:

   ```
   docker compose up
   ```

- Пункты 3 и 4 **можно** объединить в следующую команду:

    ```
    docker compose up --build
    ```
  