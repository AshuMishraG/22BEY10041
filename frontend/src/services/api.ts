const API_BASE_URL = "http://localhost:5001/api";

// Mock data for development when API is unavailable
const MOCK_USERS: User[] = [
   {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
         name: "Romaguera-Crona",
         catchPhrase: "Multi-layered client-server neural-net",
         bs: "harness real-time e-markets",
      },
   },
   {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
         name: "Deckow-Crist",
         catchPhrase: "Proactive didactic contingency",
         bs: "synergize scalable supply-chains",
      },
   },
   {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      phone: "1-463-123-4447",
      website: "ramiro.info",
      company: {
         name: "Romaguera-Jacobson",
         catchPhrase: "Face to face bifurcated interface",
         bs: "e-enable strategic applications",
      },
   },
   {
      id: 4,
      name: "Patricia Lebsack",
      username: "Karianne",
      email: "Julianne.OConner@kory.org",
      phone: "493-170-9623 x156",
      website: "kale.biz",
      company: {
         name: "Robel-Corkery",
         catchPhrase: "Multi-tiered zero tolerance productivity",
         bs: "transition cutting-edge web services",
      },
   },
   {
      id: 5,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      phone: "(254)954-1289",
      website: "demarco.info",
      company: {
         name: "Keebler LLC",
         catchPhrase: "User-centric fault-tolerant solution",
         bs: "revolutionize end-to-end systems",
      },
   },
];

const MOCK_POSTS: Post[] = [
   {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
   },
   {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
   },
   {
      userId: 2,
      id: 11,
      title: "et ea vero quia laudantium autem",
      body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus accusamus in eum beatae sit vel qui neque voluptates ut commodi qui incidunt ut animi commodi",
   },
   {
      userId: 2,
      id: 12,
      title: "in quibusdam tempore odit est dolorem",
      body: "itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem incidunt ea est distinctio odio",
   },
];

const MOCK_COMMENTS: Comment[] = [
   {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
   },
   {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et",
   },
   {
      postId: 2,
      id: 6,
      name: "et fugit eligendi deleniti quidem qui sint nihil autem",
      email: "Presley.Mueller@myrl.com",
      body: "doloribus at sed quis culpa deserunt consectetur qui praesentium accusamus fugiat dicta voluptatem rerum ut voluptate autem voluptatem repellendus aspernatur dolorem in",
   },
];

// Types
export interface User {
   id: number;
   name: string;
   username: string;
   email: string;
   address?: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
         lat: string;
         lng: string;
      };
   };
   phone?: string;
   website?: string;
   company?: {
      name: string;
      catchPhrase: string;
      bs: string;
   };
}

export interface Post {
   userId: number;
   id: number;
   title: string;
   body: string;
}

export interface Comment {
   postId: number;
   id: number;
   name: string;
   email: string;
   body: string;
}

export interface AuthInfo {
   companyName: string;
   clientID: string;
   ownerName: string;
   ownerEmail: string;
   rollNo: string;
}

export interface AuthToken {
   token_type: string;
   access_token: string;
   expires_in: number;
}

// API functions
export const getAuthInfo = async (): Promise<AuthInfo> => {
   try {
      const response = await fetch(`${API_BASE_URL}/auth/info`);
      if (!response.ok) {
         throw new Error("Failed to fetch auth info");
      }
      return response.json();
   } catch (error) {
      console.warn("Using mock auth info due to API error:", error);
      return {
         companyName: "SocialApp",
         clientID: "62d73af2-3257-4030-b451-f6e1c8c1bc33",
         ownerName: "Ashutosh",
         ownerEmail: "ashutoshmishra2022@vitbhopal.ac.in",
         rollNo: "22BEY10041",
      };
   }
};

export const getAuthToken = async (): Promise<AuthToken> => {
   try {
      const response = await fetch(`${API_BASE_URL}/auth/token`);
      if (!response.ok) {
         throw new Error("Failed to fetch auth token");
      }
      return response.json();
   } catch (error) {
      console.warn("Using mock auth token due to API error:", error);
      return {
         token_type: "Bearer",
         access_token: "mock-token",
         expires_in: 3600,
      };
   }
};

export const getUsers = async (): Promise<User[]> => {
   try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
         throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log("SUCCESS: Using REAL users data from API");
      return data;
   } catch (error) {
      console.warn("ALERT: Using MOCK users data due to API error:", error);
      // Add a flag to each mock user to indicate it's mock data
      return MOCK_USERS.map((user) => ({
         ...user,
         name: `[MOCK] ${user.name}`, // Add a prefix to make it obvious this is mock data
      }));
   }
};

export const getUserPosts = async (userId: number): Promise<Post[]> => {
   try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
      if (!response.ok) {
         throw new Error(`Failed to fetch posts for user ${userId}`);
      }
      const data = await response.json();
      console.log(`SUCCESS: Using REAL posts data for user ${userId}`);
      return data;
   } catch (error) {
      console.warn(
         `ALERT: Using MOCK posts data for user ${userId} due to API error:`,
         error
      );
      // Add a flag to each mock post to indicate it's mock data
      return MOCK_POSTS.filter((post) => post.userId === userId).map(
         (post) => ({
            ...post,
            title: `[MOCK] ${post.title}`, // Add a prefix to make it obvious this is mock data
         })
      );
   }
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
   try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
      if (!response.ok) {
         throw new Error(`Failed to fetch comments for post ${postId}`);
      }
      const data = await response.json();
      console.log(`SUCCESS: Using REAL comments data for post ${postId}`);
      return data;
   } catch (error) {
      console.warn(
         `ALERT: Using MOCK comments data for post ${postId} due to API error:`,
         error
      );
      // Add a flag to each mock comment to indicate it's mock data
      return MOCK_COMMENTS.filter((comment) => comment.postId === postId).map(
         (comment) => ({
            ...comment,
            name: `[MOCK] ${comment.name}`, // Add a prefix to make it obvious this is mock data
         })
      );
   }
};
