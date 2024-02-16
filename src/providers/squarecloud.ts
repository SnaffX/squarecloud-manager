import { SquareCloudAPI } from "@squarecloud/api";

const api = new SquareCloudAPI(process.env.square_token as string);

export default api;
