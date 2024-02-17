
import tkinter
import ttk


class interface:
    def __init__(self):
        pass
    
    
    def run(self):
        
        self.window = tkinter.Tk()   
        self.window.title("UCITT Tournament Manager")
        self.window.geometry("800x600")
        
        
        
        self.inputs = tkinter.Frame(self.window)
        self.inputs.grid(row=0,column=0)
        
        
        self.matches = tkinter.Frame(self.window)
        self.inputs.grid(row=0,column=1)
        
        # self.playerName1
        
        
        self.createInputsModule(self.inputs)
        
        
        
        
        self.window.mainloop()
        
             
        
    def createInputsModule(self, frame):
        
        # inputs = tkinter.Entry(frame)
        # inputs.grid(row=0,column=0)
        
        i = tkinter.StringVar(value="")
        inputs = ttk.Combobox(frame,width=30,textvariable=i)
        
        values = ["test1","test2","abc","cef"]
        
        inputs["value"] = list(sorted(values))
        
        inputs.grid(row=0,column=0)
        
        


        
        
        
    
    
    
    
    
    
if __name__ == "__main__":
    gui = interface()
    gui.run()
