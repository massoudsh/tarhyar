# Deployment — ArvanCloud

The Vercel target has been removed. The app is now packaged as a standalone Docker image and deployed on **ArvanCloud** (Container/PaaS + CDN).

## 1. Build the image

```bash
cd web
docker build -t tarhyar-web:latest .
```

The image runs a Next.js standalone server on port `3000` (`node server.js`), produced via `output: "standalone"` in `next.config.ts`.

## 2. Push to ArvanCloud Container Registry

```bash
docker tag tarhyar-web:latest <your-arvan-registry>/tarhyar-web:latest
docker login <your-arvan-registry>
docker push <your-arvan-registry>/tarhyar-web:latest
```

Replace `<your-arvan-registry>` with your ArvanCloud Container Registry (ACR) endpoint from the ArvanCloud panel.

## 3. Deploy on ArvanCloud

- Create a new app on **ArvanCloud Container Platform (PaaS)**, pointing to the pushed image.
- Set the container port to `3000`.
- Configure environment variables needed by the app (e.g. email provider keys for the contact form, once added).
- Attach an **ArvanCloud CDN** in front of the app for static asset caching and DDoS/edge protection.
- Point the domain's DNS to ArvanCloud (A/CNAME per the panel instructions) and issue an SSL certificate from the panel.

## 4. Required credentials

An ArvanCloud API key/token is required to automate registry push and deployment (not yet provided). Until then, the steps above can be run manually from the ArvanCloud panel and local Docker CLI.

## Notes

- `web/Dockerfile` and `web/.dockerignore` define the container build.
- `.vercel` ignore entries and Vercel references in the docs have been removed; there was no `vercel.json` or Vercel-specific code in the repo, only mentions in `README.md`, `ROADMAP.md`, `TASKS.md`, and `ARCHITECTURE.md` (now updated).
