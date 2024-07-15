# Gunakan image dasar untuk Node.js
FROM node:14 AS build-stage

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Bangun aplikasi Vue.js
RUN npm run build

# Gunakan image dasar untuk server Nginx
FROM nginx:stable-alpine AS production-stage

# Salin hasil build dari tahap sebelumnya ke direktori Nginx yang sesuai
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx yang sesuai (opsional)
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# Tetapkan port yang akan digunakan
EXPOSE 80

# Perintah untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
