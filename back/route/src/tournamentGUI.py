
import tkinter


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
        
        
        
        
        
        
        self.window.mainloop()
        
             
        
    
    
    
    
    
    
    
if __name__ == "__main__":
    gui = interface()
    gui.run()
