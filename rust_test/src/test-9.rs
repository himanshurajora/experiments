use std::{error::Error, io};

use crossterm::{
    event::{self, DisableMouseCapture, Event, KeyCode},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, Clear, LeaveAlternateScreen},
};
use tui::{
    backend::{Backend, CrosstermBackend},
    layout::{Alignment, Rect},
    widgets::{
        canvas::{Canvas, Map},
        Block, BorderType, Borders,
    },
    Frame, Terminal,
};

fn main() -> Result<(), Box<dyn Error>> {
    enable_raw_mode().expect("Could not enable raw mode");
    let mut stdout = io::stdout();
    execute!(
        stdout,
        LeaveAlternateScreen,
        DisableMouseCapture,
        Clear(crossterm::terminal::ClearType::All)
    )
    .unwrap();

    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend).unwrap();

    disable_raw_mode().unwrap();
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture,
    )
    .unwrap();

    terminal.show_cursor().unwrap();

    let res = run_app(&mut terminal);
    // terminal.draw(f)

    if let Err(err) = res {
        println!("{:?}", err)
    }

    Ok(())
}

fn run_app<B: Backend>(terminal: &mut Terminal<B>) -> io::Result<()> {
    loop {
        terminal.draw(ui)?;

        if let Event::Key(key) = event::read()? {
            if let KeyCode::Char('q') = key.code {
                return Ok(());
            }
        }
    }
}

fn ui<B: Backend>(f: &mut Frame<B>) {
    let size = f.size();
    let block = Block::default()
        .borders(Borders::ALL)
        .title("Main block with round corners")
        .title_alignment(Alignment::Center)
        .border_type(BorderType::Rounded);

    let canvas = Canvas::default()
        .block(block)
        .paint(|ctx| {
            ctx.draw(&Map {
                color: tui::style::Color::Green,
                resolution: tui::widgets::canvas::MapResolution::High,
            });
        })
        .x_bounds([-360f64, 360f64])
        .y_bounds([-180f64, 180f64]);

    f.render_widget(canvas, size);
    // f.render_widget(block, size);
}
