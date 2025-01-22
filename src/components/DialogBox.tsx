import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X , Check, Plus } from "lucide-react";



function DialogBox() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#4785FF] hover:bg-blue-600 px-4 py-6 text-lg font-medium"> <Plus className="!h-6 !w-6" />Add Applicant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[485px] p-7 min-h-[270px]">
        <DialogHeader className="mb-6">
          <div className="flex items-center justify-between">
            
            <DialogTitle className="text-[21px] font-[700] text-gray-700">
           Add Applicant
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogTrigger asChild>
            </DialogTrigger>
          </div>
        </DialogHeader>
        <div className="space-y-2">
          <label htmlFor="name" className="text-lg font-medium text-gray-500">
            Name
          </label>
          <Input
            id="name"
            className="w-[100%] h-[70%]"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
        <Button
  type="submit"
  className="bg-blue-500 text-white hover:bg-blue-600 h-12 w-35 text-lg px-4 py-2 rounded-md"
>
  <Check className="!h-6 !w-6" /> Save
</Button>

<Button
  type="button"
  variant="outline"
  className="bg-gray-500 text-white hover:bg-gray-700 hover:text-white h-12 w-35 text-lg px-4 py-6 rounded-md"
>
  <X className="!h-6 !w-6 text-white" /> Cancel
</Button>


        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;