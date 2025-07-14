const express = require("express");
const router = express.Router();
const ShortUrls = require("./shorturl.model");
const log = require("./logger");

router.post("/shorturls", async (req, res) => {
  log("backend", "info", "router", `POST /shorturls called with body: ${JSON.stringify(req.body)}`);

  try {
    const { url, shortcode, validity } = req.body;

    if (!url || url.trim() === "") {
      log("backend", "warn", "router", "URL missing in request body");
      return res.status(400).json({ message: "Original URL is required" });
    }

    const code = shortcode?.trim() || Math.random().toString(36).substring(2, 8);
    const existing = await ShortUrls.findOne({ shortCode: code });

    if (existing) {
      log("backend", "warn", "router", `Shortcode "${code}" already exists`);
      return res.status(400).json({ message: "Shortcode already in use" });
    }

    const shortUrl = await ShortUrls.create({
      url: url,
      shortCode: code,
      validity: validity || 30,
    });

    const expiry = new Date(shortUrl.createdAt.getTime() + (shortUrl.validity || 30) * 60 * 1000).toISOString();
    const shortLink = `http://${req.hostname}:${process.env.PORT || 3000}/${shortUrl.shortCode}`;

    log("backend", "info", "router", `Short URL created: ${shortLink} (expires at ${expiry})`);

    res.status(201).json({ shortLink, expiry });
  } catch (err) {
    log("backend", "error", "router", `Error creating URL: ${err.message}`);
    res.status(500).json({ message: `Error creating URL: ${err.message}` });
  }
});

router.get("/shorturls/:code", async (req, res) => {
  const { code } = req.params;
  log("backend", "info", "router", `GET /shorturls/${code} called`);

  try {
    const shortUrl = await ShortUrls.findOne({ shortCode: code });

    if (!shortUrl) {
      log("backend", "warn", "router", `Shortcode "${code}" not found`);
      return res.status(404).json({ message: "Short URL not found" });
    }

    log("backend", "info", "router", `Short URL resolved: ${shortUrl.url}`);
    res.status(200).json({ url: shortUrl.url });
  } catch (err) {
    log("backend", "error", "router", `Error retrieving URL: ${err.message}`);
    res.status(500).json({ message: `Error retrieving URL: ${err.message}` });
  }
});

module.exports = router;
