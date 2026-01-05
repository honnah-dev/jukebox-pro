import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");







async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  // Create 3 users each with a playlist of 5 tracks
  for (let i = 1; i <= 3; i++) {
    const user = await createUser("user" + i, "password");
    await createPlaylist("playlist" + i, "description" + i, user.id);
    for (let j = 0; j < 5; j++) {
      await createPlaylistTrack(user.id, (i - 1) * 5 + j + 1);
    }
  }
}


// wnat to figure out how to make this work 

// const user1 = await createUser("randomEmail@gmail.com", "superSafePassword");
// for (let i = 1; i <= 5; i++) {
//   await createPlaylist("playlist" + i, "description" + i, user1.id);
// }
//   const user2 = await createUser("flipantEmail@gmail.com", "ultraSafePassword");
//   for (let i = 2; i <=5; i++ ) {
//     await createPlaylist("playlist" + i, "description" + i, user2.id)
//   }

//   const user3 = await createUser("anotherEmail@gmail.com", "mostSafePassword");
//   for (let i = 2; i <=5; i++ ) {
//     await createPlaylist("playlist" + i, "description" + i, user3.id)
//   }


// }