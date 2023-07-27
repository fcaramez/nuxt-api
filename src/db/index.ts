import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL as string;

export const connect = async (uri: string) => {
  const connection = await mongoose.connect(`${uri}`);

  console.log(`Connected to database ${connection.connection.name}`);
};
