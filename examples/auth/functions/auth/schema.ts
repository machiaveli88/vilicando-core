import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Knex from "knex";
import { join } from "path";
import { readFileSync } from "fs";
import { Model } from "objection";
import "pg";

const rsaPath = join(__dirname, "private.pem");

Model.knex(
  Knex({
    client: "pg",
    connection:
      process.env.HASURA_DATABASE_URL ||
      `postgres://postgres:@localhost:5432/postgres`,
  })
);

export class Role extends Model {
  name: string;

  static get tableName() {
    return "role";
  }
}

export class User extends Model {
  id: string;
  username: string;
  password: string;
  active: boolean;
  roles: Array<Role>;

  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: "user.id",
          through: {
            from: "user_role.user_id",
            to: "user_role.role_id",
          },
          to: "role.id",
        },
      },
    };
  }

  getRoles() {
    return this.roles.map(({ name }) => name).concat("user");
  }

  getUser() {
    return {
      id: this.id,
      username: this.username,
      roles: this.getRoles(),
      token: this.getJwt(),
    };
  }

  getJwt() {
    return jwt.sign(
      {
        name: this.username,
        // // iat: Math.floor(Date.now() / 1000),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": this.getRoles(),
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${this.id}`,
        },
      },
      readFileSync(rsaPath).toString(),
      {
        subject: this.id,
        expiresIn: "30d", // 30 days validity
        algorithm: "RS256",
      }
    );
  }

  // async $beforeInsert() {
  //   const salt = bcrypt.genSaltSync();
  //   this.password = await bcrypt.hash(this.password, salt);
  // }

  // async $beforeUpdate() {
  //   await this.$beforeInsert();
  // }

  verifyPassword(
    password: string,
    callback: (err: Error, success: boolean) => void
  ) {
    bcrypt.compare(password, this.password, callback);
  }
}
