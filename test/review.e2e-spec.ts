import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { CreateReviewDto } from "../src/review/dto/create-review.dto";
import { Types, disconnect } from "mongoose";
import { REVIEW_NOT_FOUND } from "../src/review/review.constant";

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
  name: "test",
  title: "Zagolov",
  description: "Comment",
  rating: 5,
  productId
};
describe("AppController (e2e)", () => {
  let app: INestApplication;
  let createdId:string
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/review/create (POST)-success", async () => {
    return request(app.getHttpServer())
      .post("/review/create")
      .send(testDto)
      .expect(201)
      .then(({ body }:request.Response)=>{
        createdId= body._id;
        expect(createdId).toBeDefined();
      });
  });
  it("/review/create (POST)-fail", async () => {
    return request(app.getHttpServer())
      .post("/review/create")
      .send({...testDto,rating:0})
      .expect(400)
      .then(({ body }:request.Response)=>{
        console.log(body)
      });
  });
  it("/review/:id (DELETE)-success",  () => {
    return request(app.getHttpServer())
      .delete("/review/"+createdId)
      .expect(200)
  });
  it("/review/:id (DELETE)-fail",  () => {
    return request(app.getHttpServer())
      .delete("/review/"+new Types.ObjectId().toHexString())
      .expect(404,{
        statusCode:404,
        message:REVIEW_NOT_FOUND
      })
  });
  it('byProduct/:productID/ (GET) - success', async () => {
    return request(app.getHttpServer())
      .get("/review/byProduct/"+createdId)
      .expect(200)
      .then(({body}:request.Response)=>{
        expect(body.length).toBe(0)//1
      })
  });
  it('byProduct/:productID (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get("/review/byProduct/"+new Types.ObjectId().toHexString())
      .expect(200)
      .then(({body}:request.Response)=>{
        expect(body.length).toBe(0)
      })
  });
  afterAll(()=>{
    disconnect();
  })
});
