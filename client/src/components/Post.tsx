import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const str = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel quae
        excepturi obcaecati earum ex consectetur eum porro soluta! Doloribus
        explicabo, ea recusandae quibusdam libero quod consequatur laboriosam!
        Deserunt vero quasi, quod magnam illum totam mollitia error accusamus
        corporis omnis. Ut cum rem cupiditate voluptatem amet nobis facere
        dolore voluptas itaque accusantium provident minus quaerat suscipit at
        voluptatum veritatis odit dicta perferendis vitae, illum fugiat nulla.
        Incidunt repudiandae amet numquam nostrum reiciendis, laboriosam
        explicabo animi eius magnam sequi et quibusdam cumque ipsam odio
        voluptatum blanditiis, delectus dolor ipsa quidem vitae excepturi
        libero. Harum doloremque quidem inventore iure! Sed sequi ullam
        cupiditate soluta unde aliquam! Quis minima sapiente reiciendis dicta.
        Cum dicta quis commodi quia debitis inventore, eveniet quo? Sit
        temporibus alias nostrum saepe cumque, est sequi ex hic nihil tempore
        vero ea corrupti quidem, magni, architecto id nobis minus veniam!
        Facilis tenetur pariatur totam doloremque quia, aliquam nobis fugiat
        suscipit atque a rem et omnis dicta eos! Sunt minima aspernatur amet sit
        atque. Eligendi officiis debitis itaque sapiente laborum explicabo
        accusantium nam laboriosam? Laboriosam consequuntur, corporis, suscipit
        recusandae enim officiis dolorum aspernatur quaerat, neque ab sequi in
        perferendis! Magnam voluptates soluta, distinctio eius amet voluptas qui
        nesciunt quasi perspiciatis enim. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas ad perspiciatis tenetur ab quidem cum maxime
        rerum, ratione sint numquam sequi, autem, quas corporis laborum eaque
        laboriosam? Nesciunt eos ullam autem hic, dicta quas consectetur alias
        in fugiat illum dignissimos ipsam dolorem corporis facere voluptate
        earum molestias saepe fuga minus voluptatem corrupti, reprehenderit vero
        modi? Voluptates culpa optio dolore porro. Quidem natus suscipit
        doloribus? Pariatur architecto magni ullam beatae distinctio provident
        suscipit consequatur perspiciatis reiciendis facilis. Consequatur optio
        voluptate dolore, nobis error maxime, harum dolorem itaque minima ipsum
        temporibus. Quisquam earum odio eius quos. Sapiente deleniti nihil
        perspiciatis distinctio consectetur fuga quidem adipisci voluptas
        debitis reprehenderit odio voluptatum repudiandae assumenda, est
        laudantium sequi voluptates voluptatem, repellat animi consequuntur?
        Dignissimos, qui. Molestias, accusantium! Adipisci deleniti placeat quos
        molestiae consectetur eveniet reprehenderit porro dolores hic? Repellat
        soluta temporibus accusantium necessitatibus. Voluptates doloribus minus
        dolore ducimus. Officiis doloribus quia obcaecati quos. Vel illo velit,
        sint quod dolor dolore at ab unde praesentium voluptas reprehenderit
        dicta omnis fugit magni esse veritatis cum ipsa laboriosam dolores nemo
        recusandae similique? Quasi cupiditate, nobis cumque unde officiis quo
        fugiat perspiciatis dolorum natus sequi dolor. Beatae, dolorem autem
        vel, numquam non repellendus facilis, ipsam magnam repellat voluptas
        molestiae.`;
export default function Post() {
  return (
    <div className="py-10 px-2 relative flex flex-col gap-5">
      <span className="absolute text-xl right-2 top-2">X</span>
      <h1 className="font-bold text-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed iusto
        aliquid voluptatibus maiores recusandae quisquam soluta, hic sapiente
        velit! Eum.
      </h1>
      <div className="flex justify-around">
        <span>@vaibhav18</span>
        <span>12:02</span>
      </div>
      <p>{str}</p>
      <div className="flex justify-between  sm:justify-around items-center">
        <div className="flex flex-col gap-1 items-center ">
          <FaThumbsUp />
          <span>20k</span>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          <FaThumbsDown />
          <span>1k</span>
        </div>
      </div>
    </div>
  );
}
