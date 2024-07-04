import { useCreateNewProductMutation } from "../generated/graphql-types";

const NewProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation({
    onCompleted(data) {
      console.log("mutation completed data", data);
    },
    onError(error) {
      console.log("error after executing mutation", error);
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson: any = Object.fromEntries(formData.entries());
        formJson.price = parseInt(formJson.price);

        await createNewProduct({
          variables: {
            data: formJson,
          },
        });
      }}
    >
      <label>
        Nom du produit: <br />
        <input className="text-field" name="name" />
      </label>
      <br />
      <label>
        imgUrl: <br />
        <input className="text-field" name="imgUrl" />
      </label>
      <br />
      <label>
        Prix: <br />
        <input className="text-field" name="price" />
      </label>
      <br />
      <label>
        description: <br />
        <input className="text-field" name="description" />
      </label>
      <br />

      <button className="button">Submit</button>
    </form>
  );
};
export default NewProduct;
