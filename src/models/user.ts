export interface IUser {
  name: string;
  nation: string | null;
  gender: string | null;
  birth: string;
  phone: string;
  proficiency: string;
  career: string;
  careerDetail: string;
  residenceType: string;
  selfIntroduction: string;
}

export class User {
  static async handleApplyPosting(userId: string, postId: string): Promise<void> {
    if (!['development', 'production'].includes(process.env.NODE_ENV)) return;

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : process.env.DEPLOY_URL;
    const url = `${baseUrl}/api/user/${userId}/${postId}`;
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async handleUpdateUser(userId: string, info: IUser): Promise<any> {
    if (!['development', 'production'].includes(process.env.NODE_ENV)) return;

    try {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : process.env.DEPLOY_URL;
      await fetch(`${baseUrl}/api/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ id: userId, ...info }),
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
