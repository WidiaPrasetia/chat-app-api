const express = require("express");
const prisma = require("@prisma/client");
const prismaClient = new prisma.PrismaClient();
let routes = express.Router();

routes.route("/getUser").get(getUser);
routes.route("/create").post(create);
routes.route("/createMany").post(createMany);

async function getUser(req, res, next) {
  const users = await prismaClient.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      followings: {
        select: {
          detailFollowing: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(users);
}

async function create(req, res, next) {
  const users = await prismaClient.user.create({
    data: {
      email: "agra@prisma.io",
      name: "Agra Prisma",
    },
  });

  res.status(200).json(users);
}

async function createMany(req, res, next) {
  const users = await prismaClient.user.createMany({
    data: [
      { name: "Bob", email: "bob@prisma.io" },
      { name: "Bobo", email: "bob@prisma.io" }, // Duplicate unique key!
      { name: "Yewande", email: "yewande@prisma.io" },
      { name: "Angelique", email: "angelique@prisma.io" },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });

  res.status(200).json(users);
}

module.exports = routes;
