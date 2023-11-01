require("dotenv").config();
const express = require("express");
const axios = require("axios");
const url = require("url");
const { WebhookClient, EmbedBuilder } = require("discord.js");
const systemoptions = {
  id: process.env.WEBHOOK_ID,
  token: process.env.WEBHOOK_TOKEN,
};
const system = new WebhookClient(systemoptions);
const port = process.env.PORT || 1500;
const app = express();
const mysql = require("mysql");

const connect = mysql.createConnection({
  host: process.env.host || "localhost",
  user: process.env.user || "root",
  password: process.env.password,
  database: process.env.database,
});

app.get("/api/auth/discord/redirect", async (req, res) => {
  const { code } = req.query;

  if (code) {
    const formData = new url.URLSearchParams({
      client_id: process.env.CLIENTID,
      client_secret: process.env.CLIENTSECRET,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: `http://localhost:${port}/api/auth/discord/redirect`,
    });

    const output = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (output.data) {
      try {
        const access = output.data.access_token;
        const userinfo = await axios.get(
          "https://discord.com/api/v10/users/@me",
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        system.send({
          username: "arda.xyz - Authentication",
          avatarURL:
            "https://cdn.discordapp.com/avatars/848248238866825246/95c74248e7d13a4b8247254bcf20a48d.webp?size=1024&width=0&height=256",

          embeds: [
            new EmbedBuilder()
              .setTitle("Authentication System")
              .setColor("Green")
              .setDescription("Informationen Gespeichert.")
              .addFields(
                { name: "Username", value: `${userinfo.data.username}` },
                { name: "User-ID", value: `${userinfo.data.id}` },
                { name: "Locale", value: `${userinfo.data.locale}` },
                { name: "Verfied", value: `${userinfo.data.verified}` },
                { name: "Email", value: `${userinfo.data.email}` }
              )
              .setTimestamp(),
          ],
        });
        connect.query(
          "INSERT IGNORE INTO verification (username, discordid, verified, email) VALUES (?, ?, ?, ?)",
          [
            userinfo.data.username,
            userinfo.data.id,
            userinfo.data.verified,
            userinfo.data.email,
          ]
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
});

app.listen(port, () => {
  console.clear();
  console.log(`listening on port ${port}`);
});
