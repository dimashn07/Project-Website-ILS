import { Label, TextInput } from "flowbite-react";
import { FaTrash } from 'react-icons/fa';

export function FormSejarah() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div className="flex items-center"> {/* Container untuk TextInput dan icon */}
        <div className="mb-2 block flex-grow"> {/* Container untuk Label dan TextInput */}
          <Label htmlFor="large" value="Paragraf 1" />
          <div className="relative"> {/* Container untuk TextInput dan icon */}
            <TextInput id="large" type="text" sizing="lg" />
          </div>
        </div>
        <div className="ml-2 flex items-center"> {/* Container untuk icon hapus */}
          <FaTrash />
        </div> 
      </div>     
      <div className="bg-primary hover:bg-opacity-90 rounded-lg w-24 py-2 text-center">
        <button className="text-md font-medium text-white" type="submit">Simpan</button>  
      </div>
    </form>
  );
}
