# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Step 2: Serve the app with nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Remove default nginx config and replace it with your own if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf  # (Optional)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

